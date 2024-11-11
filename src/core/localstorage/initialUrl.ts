import routes from '../../core/routes'

const initialUrlStorageField = 'EDX_ADMIN_INITIAL_URI'

const saveInitialPath = () => {
  if (!window.location.href.includes('callback')) {
    const pathName = window.location.pathname
    let destination = pathName.includes('/adminconsole')? pathName.replaceAll('/adminconsole', '') : pathName

    if (destination === '')
      destination = routes.home.url

    localStorage.setItem(initialUrlStorageField, destination)
  }
}

const getInitialPath = () => localStorage.getItem(initialUrlStorageField)

export {
  saveInitialPath,
  getInitialPath
}