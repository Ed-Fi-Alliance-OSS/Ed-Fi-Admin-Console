const getAppScope = () => {
  if (window.location.href.includes('adminconsole'))
    return 'adminconsole'

  return ''
}

export default getAppScope