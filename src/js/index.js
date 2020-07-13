import 'regenerator-runtime/runtime'

import Controller from "./Controller"
import View from "./View"
import Model from "./Model"

let model = new Model("5fc86c5bd0fc818a39aaf7c854ef1379")

let controller = new Controller(model)
let view = new View(controller,1000)
controller.setView(view)
