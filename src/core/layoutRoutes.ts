import routes from './routes'

const simpleLayoutRoutes = [
  routes.notFound.url,
  routes.internalError.url,
  routes.unauthorized.url
]

export default simpleLayoutRoutes