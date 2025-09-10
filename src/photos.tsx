//import { TextIncrease } from "@mui/icons-material";
import { List, Show,  SimpleShowLayout, TextField, ImageField, DataTable, ReferenceField, SimpleForm, EditButton, Edit, TextInput, ReferenceInput, Create} from "react-admin";


export const PhotoList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="albumId" label="Álbum">
                <ReferenceField source="albumId" reference="photos"/>
            </DataTable.Col>        
            <DataTable.Col source="id" label="ID"/>
            <DataTable.Col source="title" label="Título"/>
            <DataTable.Col source="url" label="URL"/>
            <DataTable.Col source="thumbnailUrl" label="Miniatura">
                <ImageField source="thumbnailUrl" sx={{ width: 50, height: 50 }}/>
            </DataTable.Col>
            <DataTable.Col>
                <EditButton/>
            </DataTable.Col>
        </DataTable>
    </List>
);

export const PhotoEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="photos" label="Álbum"/>
            <TextInput source="title" label="Título"/>
            <TextInput source="url" label="URL"/>
            <TextInput source="thumbnailUrl" label="Miniatura"/>
            <EditButton/>
        </SimpleForm>
    </Edit>
)

export const PhotoCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="photos" label="Álbum"/>
            <TextInput source="id" label="ID"/>
            <TextInput source="title" label="Título"/>
            <TextInput source="url" label="URL"/>
            <TextInput source="thumbnailUrl" label="Miniatura"/>
            <EditButton/>
        </SimpleForm>
    </Create>
)

export const PhotoShow = () => (
    <Show>
        <SimpleShowLayout>
            <ReferenceField source="albumId" reference="photos" label="Álbum"/>
            <TextField source="id" label="ID"/>
            <TextField source="title" label="Título"/>
            <TextField source="url" label="URL"/>
            <ImageField source="thumbnailUrl" sx={{ width: 150, height: 150 }}/>
        </SimpleShowLayout>
    </Show>
)
