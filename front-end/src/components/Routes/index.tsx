import { Routes as ReactRouterRoutes, Route } from "react-router";
import { CreateContact, Home, UpdateContact } from "../../pages";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="contacts">
          <Route path="create" element={<CreateContact />} />
          <Route path=":id" element={<UpdateContact />} />
        </Route>
      </Route>
    </ReactRouterRoutes>
  );
}
