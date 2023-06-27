"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const app_1 = __importDefault(require("./routes/app"));
const db_1 = __importDefault(require("./db"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const PORT = config_1.config.server.port;
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
(0, authentication_1.default)(passport_1.default);
app.use("/", auth_1.default);
// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    (0, app_1.default)(app);
    (0, db_1.default)();
});
