import {Datagrid, List, TextField, Create, SimpleForm, TextInput, SelectInput, Edit} from "react-admin";

export const listarReporte=()=>(
 <List>
  <Datagrid>
   <TextField source="id" label="folio"/>
   <TextField source="paramedico"/>
   <TextField source="nivel"/>
  </Datagrid>
 </List>
);

export const editarReporte=()=>(
    <Edit>
        <SimpleForm>
            <TextInput source="id" label="Folio"/>
            <TextInput source="paramedico" />
            <SelectInput source="nivel" choices={[
                {id: "alto", name: "alto"},
                {id: "medio", name: "medio"},
                {id: "bajo", name: "bajo"}
            ]} />
        </SimpleForm>
    </Edit>
);

export const crearReporte=()=>(
    <Create>
        <SimpleForm>
            <TextInput source="id" label="Folio"/>
            <TextInput source="paramedico" />
            <SelectInput source="nivel" choices={[
                {id: "alto", name: "alto"},
                {id: "medio", name: "medio"},
                {id: "bajo", name: "bajo"}
            ]} />
        </SimpleForm>
    </Create>
);
