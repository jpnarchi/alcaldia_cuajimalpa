//import { TextIncrease } from "@mui/icons-material";
import { List, DataTable, TextField, SimpleShowLayout, ReferenceField, SimpleForm,Show, EditButton, Edit, TextInput, ReferenceInput, Create} from "react-admin";

export const AlbumList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="userId" label="Usuario">
                <ReferenceField source="userId" reference="albums"/>
            </DataTable.Col>
            <DataTable.Col source="id" label="ID"/>
            <DataTable.Col source="title" label="Título"/>
            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>
        </DataTable>
    </List>
);

export const AlbumEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <ReferenceInput source="userId" reference="users" label="Usuario"/>
            <TextInput required source="title" label="Título"/>
        </SimpleForm>
    </Edit>
)

export const AlbumCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" label="Usuario"/>
            <TextInput required source="title" label="Título"/>
        </SimpleForm>
    </Create>
)

export const AlbumShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ReferenceField source="userId" reference="users" label="Usuario"/>
            <TextField source="title" label="Título"/>
        </SimpleShowLayout>
    </Show>
)