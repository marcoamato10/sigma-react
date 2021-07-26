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

  const [comment, setComment] = useState(emptyComment);
  const [submitted, setSubmitted] = useState(false);

  const [createCommentDialog, setCreateCommentDialog] = useState(false);

  const [detailCommentDialog, setDetailCommentDialog] = useState(false);

  const [deleteCommentDialog, setDeleteCommentDialog] = useState(false);

  const [editCommentDialog, setEditCommentDialog] = useState(false);
 

  //Aggiorna la lista
  const updateCommentsList = async () => {
    const { data, totalRecords } = await getComments(page.page, page.rows)
    setComments(data);
    setTotalRecords(totalRecords)
  }

  useEffect(() => {
    updateCommentsList()
  }, [page]);


  //Funzioni che nascondono le dialog
  const hideDialog = () => {
    setSubmitted(false);
    setCreateCommentDialog(false);
  }

  const hideDetailDialog = () => {
    setDetailCommentDialog(false);
  }

  const hideEditDialog = () => {
    setEditCommentDialog(false);
  }

  const hideDeleteCommentDialog = () => {
    setDeleteCommentDialog(false);
  }

  //tasto new
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={confirmNewComment} />
      </React.Fragment>
    )
  }

  const confirmNewComment = () => {
    setComment(emptyComment);
    setSubmitted(false);
    setCreateCommentDialog(true);
  }

  //tasti detail, edit e delete
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-mr-2" onClick={() => confirmDetailComment(rowData)} />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => confirmEditComment(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteComment(rowData)} />
      </div>
    );
  }
  const confirmDetailComment = (comment) => {
    setComment(comment);
    setDetailCommentDialog(true);
  }

  const confirmEditComment = (comment) => {
    setComment(comment);
    setEditCommentDialog(true);
  }

  const confirmDeleteComment = (comment) => {
    setComment(comment);
    setDeleteCommentDialog(true);
  }

  //tasti del crea
  const createCommentDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveComments} />
    </>
  );

  const saveComments = async () => {
    setSubmitted(true);
    await createComments(comment)
    updateCommentsList()
    setCreateCommentDialog(false);
    setComment(emptyComment);
  }

  //tasti del dettaglio
  const detailCommentDialogFooter = (comment) => (
    <>
      <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={hideDetailDialog} />
    </>
  );

  //tasti del modifica
  const editCommentDialogFooter = (comment) => (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideEditDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => editComment(comment)} />
    </>
  );

  const editComment = async (comment) => {
    await updateComm(comment);
    setEditCommentDialog(false);
    updateCommentsList();
  }

  //tasti del cancella
  const deleteCommentDialogFooter = (comment) => (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCommentDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => deleteComment(comment)} />
    </>
  );

  const deleteComment = async (comment) => {
    await deleteComm(comment);
    setDeleteCommentDialog(false);
    updateCommentsList();
    // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Comment Deleted', life: 3000 });
  }

//Funzione per cambiare i valori nelle dialogs
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
            emptyMessage="Non ci sono commenti."
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" header="Id" sortable ></Column>
            <Column field="name" header="Name" sortable ></Column>
            <Column field="email" header="Email" sortable ></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>

          {/* Dialog del Crea */}
          <Dialog
            visible={createCommentDialog}
            style={{ width: '450px' }}
            header="Comment Details"
            modal
            className="p-fluid"
            footer={createCommentDialogFooter}
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

          {/* Dialog del Dettaglio */}
          <Dialog
            visible={detailCommentDialog}
            style={{ width: '550px' }}
            header="Comment Details"
            modal
            className="p-fluid"
            footer={detailCommentDialogFooter(comment)}
            onHide={hideDetailDialog}
          >
            <div className="p-field">
              <label htmlFor="postId">PostId</label>
              <InputText id="postId" value={comment.postId} onChange={(e) => onInputChange(e, 'postId')} required rows={3} cols={20} />
            </div>
            <div className="p-field">
              <label htmlFor="id">Id</label>
              <InputText id="id" value={comment.id} onChange={(e) => onInputChange(e, 'id')} required rows={3} cols={20} />
            </div>
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={comment.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !comment.name })} />
              {submitted && !comment.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="p-field">
              <label htmlFor="email">Email</label>
              <InputText id="email" value={comment.email} onChange={(e) => onInputChange(e, 'email')} required rows={3} cols={20} />
            </div>
            <div className="p-field">
              <label htmlFor="body">Body</label>
              <InputText id="body" value={comment.body} onChange={(e) => onInputChange(e, 'body')} required rows={5} cols={50} />
            </div>
          </Dialog>

          {/* Dialog del Modifica */}
          <Dialog
            visible={editCommentDialog}
            style={{ width: '450px' }}
            header="Comment Details"
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

          {/* Dialog del Cancella */}
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