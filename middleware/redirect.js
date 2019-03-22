export default function ({ route, redirect, store }) {
  if (route.name === 'logout' || route.name === 'delete-id') {
    redirect('/')
  }
  if (route.name === 'edit-id') {
    let currentIndex
    store.state.user.ads.forEach((element, index) => {
      if (Number(element.id) === Number(route.params.id)) {
        currentIndex = index
      }
    })
    if (store.state.user.ads[currentIndex].author !== store.state.user.cookieId) {
      redirect('/')
    }
  }
}
