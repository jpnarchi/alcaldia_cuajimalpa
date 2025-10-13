// src/spanishMessages.ts
export const spanishMessages = {
    ra: {
      action: {
        add_filter: 'Agregar filtro',
        add: 'Agregar',
        back: 'Regresar',
        bulk_actions:
          'Un objeto seleccionado |||| %{smart_count} objetos seleccionados',
        cancel: 'Cancelar',
        clear_array_input: 'Limpiar la lista',
        clear_input_value: 'Limpiar valor',
        clone: 'Clonar',
        confirm: 'Confirmar',
        create: 'Crear',
        create_item: 'Crear %{item}',
        delete: 'Eliminar',
        edit: 'Editar',
        export: 'Exportar',
        list: 'Lista',
        refresh: 'Actualizar',
        toggle_theme: 'Cambiar tema',
        unselect: 'Deseleccionar',
        remove_filter: 'Quitar filtro',
        remove_all_filters: 'Quitar todos los filtros',
        save: 'Guardar',
        search: 'Buscar',
        show: 'Mostrar',
        sort: 'Ordenar',
        undo: 'Deshacer',
      },
      boolean: {
        true: 'Sí',
        false: 'No',
        null: '',
      },
      page: {
        create: 'Crear %{name}',
        dashboard: 'Panel',
        edit: '%{name} #%{id}',
        error: 'Ocurrió un error',
        list: '%{name}',
        loading: 'Cargando',
        not_found: 'No encontrado',
        show: '%{name} #%{id}',
        empty: 'Sin %{name} aún.',
        invite: '¿Deseas agregar uno?',
      },
      input: {
        file: {
          upload_several:
            'Arrastra archivos para subir, o haz clic para seleccionar uno.',
          upload_single:
            'Arrastra un archivo para subir, o haz clic para seleccionarlo.',
        },
        image: {
          upload_several:
            'Arrastra imágenes para subir, o haz clic para seleccionar una.',
          upload_single:
            'Arrastra una imagen para subir, o haz clic para seleccionarla.',
        },
        password: {
          toggle_hidden: 'Mostrar/ocultar contraseña',
          toggle_visible: 'Ocultar contraseña',
        },
        references: {
          all_missing: 'No se pueden encontrar datos de referencias.',
          many_missing:
            'Al menos una de las referencias asociadas ya no parece disponible.',
          single_missing:
            'La referencia asociada ya no parece estar disponible.',
        },
      },
      message: {
        about: 'Acerca de',
        are_you_sure: '¿Estás seguro?',
        bulk_delete_content:
          '¿Estás seguro de eliminar este %{name}? |||| ¿Estás seguro de eliminar estos %{smart_count} elementos?',
        bulk_delete_title: 'Eliminar %{name} |||| Eliminar %{smart_count} %{name}',
        delete_content: '¿Seguro que quieres eliminar este elemento?',
        delete_title: 'Eliminar %{name} #%{id}',
        details: 'Detalles',
        error: 'Error en el servidor, intenta más tarde.',
        invalid_form: 'El formulario no es válido. Revisa los errores.',
        loading: 'La página se está cargando, espera un momento.',
        no: 'No',
        not_found: 'URL incorrecta o enlace roto.',
        yes: 'Sí',
      },
      navigation: {
        no_results: 'No se encontraron resultados',
        no_more_results:
          'La página %{page} está fuera de rango. Intenta con la anterior.',
        page_out_of_boundaries: 'Página %{page} fuera de rango',
        page_out_from_end: 'No se puede ir más allá de la última página',
        page_out_from_begin: 'No se puede ir antes de la primera página',
        page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
        page_rows_per_page: 'Filas por página:',
        next: 'Siguiente',
        prev: 'Anterior',
      },
      sort: {
        ASC: 'Ascendente',
        DESC: 'Descendente',
      },
      configurable: {
        customize: 'Personalizar',
      },
      notification: {
        updated: 'Elemento actualizado |||| %{smart_count} elementos actualizados',
        created: 'Elemento creado',
        deleted: 'Elemento eliminado |||| %{smart_count} elementos eliminados',
        bad_item: 'Elemento incorrecto',
        item_doesnt_exist: 'El elemento no existe',
        http_error: 'Error de comunicación con el servidor',
        canceled: 'Acción cancelada',
      },
      auth: {
        username: 'Usuario',
        password: 'Contraseña',
        sign_in: 'Iniciar sesión',
        sign_in_error: 'Error de autenticación',
        logout: 'Cerrar sesión',
      },
      menu: {
        open: 'Abrir/Cerrar menú',
      },
      user: {
        profile: 'Mi perfil',
      },
    },
    resources: {
      'Mi Perfil': {
        name: 'Mi perfil |||| Mi perfil',
        fields: {},
      },
      'Crear folio': {
        name: 'Crear folio |||| Crear folio',
        fields: {},
        action: {
          edit: 'Editar',
        },
      },
      'Folios creados': {
        name: 'Folios creados |||| Folios creados',
        fields: {},
        action: {
          edit: 'Solicitar modificación',
        },
      },
      users: {
        name: 'Usuario |||| Usuarios',
      },
      posts: {
        name: 'Publicación |||| Publicaciones',
      },
      albums: {
        name: 'Álbum |||| Álbumes',
      },
      comments: {
        name: 'Comentario |||| Comentarios',
      },
      todos: {
        name: 'Tarea |||| Tareas',
      },
      photos: {
        name: 'Foto |||| Fotos',
      },
    },
  };