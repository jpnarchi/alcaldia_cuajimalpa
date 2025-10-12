//import { TextIncrease } from "@mui/icons-material";
import { List, DataTable, Show, SimpleShowLayout, TextField,PostFilters, ReferenceField, SimpleForm, EditButton, Edit, TextInput, ReferenceInput, Create} from "react-admin";

export const PostList = () => {
    const PostFilters = [
    <TextInput source="q" label="Buscar" alwaysOn/>,
    <ReferenceInput source="userId" reference="users" label="Usuario">
    </ReferenceInput>
    ]
    return (
    <List filters={PostFilters}>
        <DataTable>
            <DataTable.Col source="userId" label="Usuario">
                <ReferenceField source="userId" reference="users"/>
            </DataTable.Col>
            <DataTable.Col source="id" label="ID"/>
            <DataTable.Col source="title" label="Título"/>
            <DataTable.Col source="body" label="Contenido"/>
            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>
        </DataTable>
    </List>
)
};

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <ReferenceInput source="userId" reference="users" label="Usuario"/>
            <TextInput required source="title" label="Título"/>
            <TextInput source="body" label="Contenido"/>
        </SimpleForm>
    </Edit>
)

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" label="Usuario"/>
            <TextInput required source="title" label="Título"/>
            <TextInput required source="body" label="Contenido" multiline rows={5}/>
        </SimpleForm>
    </Create>
)

export const PostShow = () => (
    <Show>
    
        <SimpleShowLayout>
            <ReferenceField source="userId" reference="users" label="Usuario"/>
            <TextField source="title" label="Título"/>
            <TextField source="body" label="Contenido"/>
        </SimpleShowLayout>
    
    </Show>
)