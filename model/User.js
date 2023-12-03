const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "user.id",
          to: "post.userId",
        },
      },
    };
  }
}

module.exports = User;
