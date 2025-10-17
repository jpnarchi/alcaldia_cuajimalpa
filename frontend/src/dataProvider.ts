import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:3000';

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  // Agregar token de autenticación si existe
  // Intentar obtener de localStorage primero, luego de sessionStorage
  const token = localStorage.getItem('token') || sessionStorage.getItem('auth');
  console.log('🔑 Token:', token ? 'ENCONTRADO ✅' : 'NO ENCONTRADO ❌');

  if (token) {
    options.headers.set('Authentication', token);
    console.log('✅ Header Authentication establecido');
  } else {
    console.warn('⚠️ No hay token disponible');
  }

  console.log('📡 Petición a:', url);

  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      ...params.filter,
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { headers, json } = await httpClient(url);

    return {
      data: json,
      total: parseInt(headers.get('X-Total-Count') || '0', 10),
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      [params.target]: params.id,
    };

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { headers, json } = await httpClient(url);

    return {
      data: json,
      total: parseInt(headers.get('X-Total-Count') || '0', 10),
    };
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { json } = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: 'DELETE',
    });
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    );
    return { data: params.ids };
  },
};
