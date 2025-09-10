

import { List, DataTable,TextField, ReferenceField, SimpleForm,SimpleShowLayout, Show, EditButton, Edit, TextInput, ReferenceInput, Create} from "react-admin";
import { usePermissions } from "./hooks/usePermissions";

export const UserList = () => {
    const { canEdit } = usePermissions();
    
    return (
        <List>
            <DataTable>
                <DataTable.Col source="id" label="ID"/>
                <DataTable.Col source="name" label="Nombre"/>
                <DataTable.Col source="username" label="Usuario"/>
                <DataTable.Col source="email" label="Correo"/>
                <DataTable.Col source="phone" label="Teléfono"/>
                {canEdit('users') && (
                    <DataTable.Col>
                        <EditButton/>
                    </DataTable.Col>
                )}
            </DataTable>
        </List>
    );
};

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput required source="name" label="Nombre" />
            <TextInput source="username" label="Usuario" />
        </SimpleForm>
    </Edit>

)

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput required source="id" label="ID" /> 
            <TextInput required source="name" label="Nombre" />
            <TextInput required source="username" label="Usuario" />
            <TextInput required source="email" label="Correo" />  
            <TextInput required source="phone" label="Teléfono" />
        </SimpleForm>
    </Create>

)

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nombre" />
            <TextField source="username" label="Usuario" />
            <TextField source="email" label="Correo" />
            <TextField source="phone" label="Teléfono" />
        </SimpleShowLayout>
    </Show>

)