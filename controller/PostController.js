module.exports = class PostController {
  static post(req, res) {
    const posts = [
      { id: "62e5be7526c2d98d737ac4f1", name: "Rafael", title: "Post 1" },
      { id: "62e5be7526c2d98d737ac4f2", name: "Pedro", title: "Post 2" },
    ];
    console.log(req.user);
    res.json(posts.filter((post) => post.id === req.user.id));
  }
};
