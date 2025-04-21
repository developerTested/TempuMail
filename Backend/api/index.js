import { app, port } from "../src/app.js";

app.listen(port, () => console.log(`server running port ${port}`));