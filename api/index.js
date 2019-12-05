import util from './util'
export default function(request, response) {
  router(request, response, require('./routes'))
}

function router(request, response, routes) {
  const ROUTES = assembleRoutes(routes),
    route = ROUTES.find(requestedRoute, { req: request })
  if (!route) util.send(response, { message: 'Resource not found.' }, 404)
  else route.pop()(request, response)
}

function assembleRoutes(routes) {
  const GET = routes.GET.map(p => ['GET', ...p]),
    POST = routes.POST.map(p => ['POST', ...p])
  return [].concat(GET, POST)
}

function requestedRoute(route) {
  const [_method, _route] = route
  return _method === this.req.method && _route === this.req.url.split('?')[0]
}
