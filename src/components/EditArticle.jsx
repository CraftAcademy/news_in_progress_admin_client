import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Article } from "../modules/apiHelper";
import { Container, Form, Button } from "semantic-ui-react";

const EditArticle = () => {
  const { article } = useSelector((state) => state);
  const { id } = useParams();

  const { handleSubmit, setValue } = useForm();
  const onSubmit = (article) => {
    Article.create({ article }).then((response) => {
      if (
        response.data.message ===
        `You have successfully added ${article.title} to the site`
      ) {
      }
    });
  };

  useEffect(() => {
    Article.show(id);
    // debugger
  }, [id]);

  return (
    <Container>
      <Form
        size="huge"
        data-cy="edit-article"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Input
          name="title"
          data-cy="title-input"
          placeholder="Title"
          defaultValue={article?.title}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        ></Form.Input>
        <Form.Input
          data-cy="journalist-input"
          placeholder="Journalists"
          name="journalist"
          value={article?.authors}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Form.Input
          data-cy="lede-input"
          placeholder="Lede"
          name="lede"
          defaultValue={article?.lede}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Form.Input
          data-cy="category-input"
          placeholder="Category"
          name="category"
          value={article?.category}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Form.TextArea
          data-cy="body-input"
          placeholder="Body"
          name="body"
          defaultValue={article?.body}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Button data-cy="submit-button" type="submit">
          Submit
        </Button>
      </Form>
      {/* <Modal
        basic
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Content>
          <h1 data-cy="article-edited">
            You have successfully edited the article
          </h1>
        </Modal.Content>
      </Modal> */}
    </Container>
  );
};

export default EditArticle;