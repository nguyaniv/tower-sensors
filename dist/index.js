"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const sensorRoutes_1 = __importDefault(require("./routes/sensorRoutes"));
const temperatureRoutes_1 = __importDefault(require("./routes/temperatureRoutes"));
const sensorDataRoutes_1 = __importDefault(require("./routes/sensorDataRoutes"));
const mulfunctioningSensorsRoutes_1 = __importDefault(require("./routes/mulfunctioningSensorsRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/api', sensorRoutes_1.default);
app.use('/api', temperatureRoutes_1.default);
app.use('/api', sensorDataRoutes_1.default);
app.use('/api', mulfunctioningSensorsRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
