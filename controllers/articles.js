import Article from "../models/article.js";
import BadRequestError from "../errors/bad-request-err.js";
import NotFoundError from "../errors/not-found-err.js";
import ForbiddenError from "../errors/forbidden-err.js";

export const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

export const createArticle = async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  if (!keyword || !title || !text || !date || !source || !link || !image) {
    throw new BadRequestError("Dados inválidos fornecidos");
  }

  try {
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });
    return res.send({ data: article });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(
        new BadRequestError("Dados inválidos fornecidos para salvar artigo.")
      );
    }
    return next(err);
  }
};

export const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select("+owner")
    .orFail(() => {
      throw new NotFoundError("Artigo não encontrado");
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "Você não tem permissão para excluir este artigo"
        );
      }

      return Article.findByIdAndDelete(req.params.articleId).then(
        (deletedArticle) => res.send({ data: deletedArticle })
      );
    })
    .catch(next);
};
