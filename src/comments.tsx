//import { TextIncrease } from "@mui/icons-material";
import { List, DataTable,TextField, ReferenceField, SimpleForm,SimpleShowLayout, Show, EditButton, Edit, TextInput, ReferenceInput, Create} from "react-admin";

export const CommentList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="postId" label="Publicación">
                <ReferenceField source="postId" reference="comments"/>
            </DataTable.Col>
            <DataTable.Col source="id" label="ID"/>
            <DataTable.Col source="name" label="Nombre"/>
            <DataTable.Col source="email" label="Correo"/>
            <DataTable.Col source="body" label="Contenido"/>
            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>
        </DataTable>
    </List>
);

export const CommentEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput required source="name" label="Nombre" />
            <TextInput source="body" label="Contenido" />
        </SimpleForm>
    </Edit>

)

export const CommentCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput required source="postId" label="Publicación" /> 
            <TextInput required source="id" label="ID" /> 
            <TextInput required source="name" label="Nombre" />
            <TextInput required source="email" label="Correo" />  
            <TextInput required source="body" label="Contenido" multiline rows={5} />
        </SimpleForm>
    </Create>

)

export const CommentShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="postId" label="Publicación" />
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nombre" />
            <TextField source="email" label="Correo" />
            <TextField source="body" label="Contenido" />
        </SimpleShowLayout>
    </Show>

)