import React, { useState, useEffect } from 'react'
import { CommentsService } from './CommentsService';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';


const Comments = () => {
  const emptyComment = {
    id: null,
    name: '',
    email: ''
  };

  const { getComments, createComments, deleteComm, updateComm } = new CommentsService();
  const [comments, setComments] = useState([])
  const [selectedComments, setSelectedComments] = useState(null)
  const [page, setPage] = useState({ first: 0, rows: 5, page: 0, pageCount: 0 });
  const [totalRecords, setTotalRecords] = useState(0)

  const [commentDialog, setCommentDialog] = useState(false);
  const [comment, setComment] = useState(emptyComment);
  const [submitted, setSubmitted] = useState(false);

  const [deleteCommentDialog, setDeleteCommentDialog] = useState(false);

  const [editCommentDialog, setEditCommentDialog] = useState(false);
  /*const [deleteCommentsDialog, setDeleteCommentsDialog] = useState(false);*/

  const updateCommentsList = async () => {
    const { data, totalRecords } = await getComments(page.page, page.rows)
    setComments(data);
    setTotalRecords(totalRecords)
  }

  useEffect(() => {
    updateCommentsList()
  }, [page]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
      </React.Fragment>
    )
  }

  const hideDialog = () => {
    setSubmitted(false);
    setCommentDialog(false);
  }

  const hideEditDialog = () => {
    setEditCommentDialog(false);
  }

  const hideDeleteCommentDialog = () => {
    setDeleteCommentDialog(false);
  }


  const openNew = () => {
    setComment(emptyComment);
    setSubmitted(false);
    setCommentDialog(true);
  }

  const saveComments = async () => {
    setSubmitted(true);
    await createComments(comment)
    updateCommentsList()
    setCommentDialog(false);
    setComment(emptyComment);

  }

  const commentDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveComments} />
    </>
  );



const confirmEditComment = (comment) => {
  setComment(comment);
  setEditCommentDialog(true);
}

  const editComment = (comment) => {
    updateComm(comment);
    setEditCommentDialog(false);
    updateCommentsList();
  }



  const confirmDeleteComment = (comment) => {
    setComment(comment);
    setDeleteCommentDialog(true);
  }

  const deleteComment = async (comment) => {
    await deleteComm(comment);
    // let _comments = comments.filter(val => val.id !== comments.id);
    // setComments(_comments);
    setDeleteCommentDialog(false);
    // setComment(emptyComment);
    updateCommentsList();
    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Comment Deleted', life: 3000 });
  }


  //tasti edit e delete
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-mr-2" />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => confirmEditComment(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteComment(rowData)} />
      </div>
    );
  }

  //tasti del modifica
  const editCommentDialogFooter = (comment) => (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideEditDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => editComment(comment)} />
    </>
  );


  //tasti del cancella
  const deleteCommentDialogFooter = (comment) => (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCommentDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => deleteComment(comment)} />
    </>
  );

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _comment = { ...comment };
    _comment[`${name}`] = val;

    setComment(_comment);
  }
  return (
    <div className="p-grid crud-demo">
      <div className="p-col-12">
        <div className="card">
          <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={comments}
            selection={selectedComments}
            onSelectionChange={(e) => setSelectedComments(e.value)}
            first={page.first}
            onPage={setPage}
            dataKey="id"
            paginator
            lazy
            totalRecords={totalRecords}
            rows={page.rows}
            rowsPerPageOptions={[2, 5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Stai visualizzando dal record {first} al record {last} di {totalRecords} commenti"
            emptyMessage="Non ci sono utenti."
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" header="Id" sortable ></Column>
            <Column field="name" header="Name" sortable ></Column>
            <Column field="email" header="Email" sortable ></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>

           
          <Dialog
            visible={commentDialog}
            style={{ width: '450px' }}
            header="User Details"
            modal
            className="p-fluid"
            footer={commentDialogFooter}
            onHide={hideDialog}
          >
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={comment.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !comment.name })} />
              {submitted && !comment.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText id="email" value={comment.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
            </div>
          </Dialog>


          <Dialog
            visible={editCommentDialog}
            style={{ width: '450px' }}
            header="User Details"
            modal
            className="p-fluid"
            footer={editCommentDialogFooter(comment)}
            onHide={hideEditDialog}
          >
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={comment.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !comment.name })} />
              {submitted && !comment.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText id="email" value={comment.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
            </div>
          </Dialog>


          <Dialog 
           visible={deleteCommentDialog}
           style={{ width: '450px' }} 
           header="Confirm" 
           modal footer={deleteCommentDialogFooter(comment)} 
           onHide={hideDeleteCommentDialog}>
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
              {comment && <span>Are you sure you want to delete <b>{comment.name}</b>?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Comments