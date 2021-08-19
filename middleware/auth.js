export default function (context) {
  let token = context.store.getters["me/getToken"];
  let user = context.store.getters["me/getUser"]
  if (!token || !user) {
    context.redirect("/login");
  }
}
