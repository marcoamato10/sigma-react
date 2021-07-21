import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { UserService } from './UserService';

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState(null)

  useEffect(() => {
    const userService = new UserService();
    userService.getUsers().then(data => {
      setUsers(data)
    })
  }, []);

  return (
    <DataTable
      value={users}
      selection={selectedUsers}
      onSelectionChange={(e) => setSelectedUsers(e.value)}
      dataKey="id"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25]}
      className="datatable-responsive"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Stai visualizzando dal record {first} al record {last} di {totalRecords} utenti"
      emptyMessage="Non ci sono utenti."
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      <Column field="name" header="Name" sortable ></Column>
      <Column field="email" header="Email" sortable ></Column>
      <Column field="address.city" header="City" sortable ></Column>
      <Column field="address.geo.lat" header="Latitude" sortable ></Column>
      <Column field="address.geo.lng" header="Longitude" sortable ></Column>
      <Column field="address.zipcode" header="Zipcode" sortable ></Column>
      {/*
      <Column field="code" header="Code" sortable body={codeBodyTemplate}></Column>
      <Column header="Image" body={imageBodyTemplate}></Column>
      <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
      <Column field="category" header="Category" sortable body={categoryBodyTemplate}></Column>
      <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column>
      <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column>
      <Column body={actionBodyTemplate}></Column>
       */}
    </DataTable>
  )
}

const Users = () => {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <div> Create </div>
      </Route>
      <Route path={match.path}>
        <UsersList />
      </Route>
    </Switch>
  )
}

export default Users

