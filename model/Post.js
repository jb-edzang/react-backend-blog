const { Model } = require("objection");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static get relationMappings() {
    const User = require("./User");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "post.userId",
          to: "user.id",
        },
      },
    };
  }
}

module.exports = Post;
