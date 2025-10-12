import {Datagrid, List, TextField, Create, SimpleForm, TextInput, SelectInput, Edit} from "react-admin";

export const listarHorarios=()=>(
 <List>
  <Datagrid>
   <TextField source="id" label="folio"/>
   <TextField source="paramedico"/>
   <TextField source="nivel"/>
  </Datagrid>
 </List>
);

export const editarHorarios=()=>(
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

export const crearHorarios=()=>(
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
