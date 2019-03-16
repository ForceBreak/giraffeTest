export default function ({ route, redirect, store }) {
  if (route.name === 'logout' || route.name === 'delete-id') {
    redirect('/')
  }
}
