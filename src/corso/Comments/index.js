

import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CommentsService } from './CommentsService';

const Comments = () => {
    const [comments, setComments] = useState([])


    useEffect(() => {
        const commentsService = new CommentsService;
        commentsService.getComments().then(data => {
            setComments(data)
        })
    }, []);


    return (
        <DataTable
            value={comments}
            dataKey="id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} comments"
            emptyMessage="No comments found."
        >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="id" header="Id" sortable></Column>
            <Column field="name" header="Nome" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
        </DataTable>
    )
}
export default Comments