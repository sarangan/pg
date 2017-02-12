import dispatcher from "../dispatcher";

export function createTodo(text) {
  dispatcher.dispatch({
    type: "CREATE_TODO",
    text,
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: "DELETE_TODOS",
    id,
  });
}

export function fetchPropList() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
console.log('fucker');
  dispatcher.dispatch({
    type: "GET_PROPERTYLIST",
    data: [1,2,3],
  });


}
