import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/posts", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc", //descinding
      }
    });
    
    res.json(posts);
  } catch (error: any) {
    next(error.message)
  }
});


app.get("/posts/:id", async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })

    res.json(post);

  } catch (error: any) {
    next(error.message)
  }
})


app.get("/users/:id/posts", async (req, res, next) => {
  try {
    const userPosts = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        posts: {
          where: {
            published: true
          }
        }
      }
    })
    res.json(userPosts?.posts);

  } catch (error: any) {
    next(error.message)
  }
});

app.post("/posts", async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {authorId: 1, ...req.body}
    })

    res.json(post);
  } catch (error: any) {
    next(error.message)
  }
});

app.patch("/posts/:id", async (req, res, next) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(req.params.id)
      },
      data: req.body
    })

    res.json(post)
  } catch (error: any) {
    next(error.message)
  }
});

app.delete("/posts/:id", async (req, res, next) => {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id)
      }
    })

    res.json({message: "Post deleted"})
  } catch (error: any) {
    next(error.message)
  }
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
});