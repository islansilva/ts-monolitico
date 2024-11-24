"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEntity {
    constructor(id) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }
    get id() {
        return this._id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    set updatedAt(updatedAt) {
        this._updatedAt = updatedAt;
    }
}
exports.default = BaseEntity;
