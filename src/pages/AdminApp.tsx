import { Admin, Resource } from 'react-admin';
import { Users, FileText, Image, MessageSquare, CheckSquare, Camera } from 'lucide-react';

import { Layout } from "../Layout";
import { AlbumList, AlbumEdit, AlbumCreate, AlbumShow } from '../albums';
import { CommentList, CommentEdit, CommentCreate, CommentShow } from '../comments';
import { dataProvider } from "../dataProvider";
import { UserList, UserEdit, UserCreate, UserShow } from "../users";
import { i18nProvider } from '../i18nProvider';
import { PostEdit, PostList, PostCreate, PostShow } from '../posts';
import { PhotoList, PhotoEdit, PhotoCreate, PhotoShow } from '../photos';
import { TodoList, TodoEdit, TodoCreate, TodoShow } from '../todos';
import { authProvider } from '../authProvider';
import { CustomUserList } from '../components/CustomUserList';
import { DashboardStats } from '../components/DashboardStats';

export const AdminApp = () => (
    <Admin 
        layout={Layout} 
        dataProvider={dataProvider} 
        authProvider={authProvider} 
        i18nProvider={i18nProvider}
        basename="/admin"
    > 
        <Resource name = 'users' list = {UserList} show = {UserShow} edit = {UserEdit} create = {UserCreate} icon={Users} options={{ label: 'Usuarios' }}/>
        <Resource name = 'posts' list = {PostList} edit = {PostEdit} create = {PostCreate} show = {PostShow} icon={FileText} options={{ label: 'Publicaciones' }}/>
        <Resource name = 'albums' list = {AlbumList} edit = {AlbumEdit} create = {AlbumCreate} show = {AlbumShow} icon={Image} options={{ label: 'Álbumes' }}/>
        <Resource name = 'comments' list = {CommentList} edit = {CommentEdit} create = {CommentCreate} show = {CommentShow} icon={MessageSquare} options={{ label: 'Comentarios' }}/>
        <Resource name = 'todos' list = {TodoList} edit = {TodoEdit} create = {TodoCreate} show = {TodoShow} icon={CheckSquare} options={{ label: 'Tareas' }}/>
        <Resource name = 'photos' list = {PhotoList} edit = {PhotoEdit} create = {PhotoCreate} show = {PhotoShow} icon={Camera} options={{ label: 'Fotos' }}/>
        
        {/* Ejemplos con useGetList hook */}
        <Resource name="custom-users" list={CustomUserList} options={{ label: 'Usuarios Custom (useGetList)' }} />
        <Resource name="dashboard-stats" list={DashboardStats} options={{ label: 'Dashboard Stats' }} />
    </Admin>
);