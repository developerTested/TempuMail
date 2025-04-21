import { app, port } from "./app.js";

app.listen(port, () => console.log(`server running port ${port}`));