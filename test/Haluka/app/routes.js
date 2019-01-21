var Route = use('Route')

Route.point('/foo')
Route.point('/bar', to('test'))
Route.point('/baz', to('baz'))
