//import { TextIncrease } from "@mui/icons-material";
import { List, DataTable, Show, SimpleShowLayout, TextField, ReferenceField, SimpleForm, EditButton, Edit, TextInput, ReferenceInput, Create} from "react-admin";

export const TodoList = () => {
    const TodoFilters = [
    <TextInput source="q" label="Buscar" alwaysOn/>,
    <ReferenceInput source="userId" reference="users" label="Usuario">
    </ReferenceInput>
    ]
    return (
    <List filters={TodoFilters}>
        <DataTable>
            <DataTable.Col source="userId" label="Usuario">
                <ReferenceField source="userId" reference="todos"/>
            </DataTable.Col>
            <DataTable.Col source="id" label="ID"/>
            <DataTable.Col source="title" label="Título"/>
            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>
        </DataTable>
    </List>
)};


export const TodoEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="userId" reference="todos" label="Usuario"/> 
            <TextInput source="title" label="Título"/>
            <TextInput source="completed" label="Completado"/>
            <EditButton/>
        </SimpleForm>
    </Edit>
)

export const TodoCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="todos" label="Usuario"/> 
            <TextInput source="title" label="Título"/>
            <TextInput source="completed" label="Completado"/>
            <EditButton/>
        </SimpleForm>
    </Create>
)

export const TodoShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="userId" reference="todos" label="Usuario"/> 
            <TextField source="title" label="Título"/>
            <TextField source="completed" label="Completado"/>
        </SimpleShowLayout>
    </Show>
)
