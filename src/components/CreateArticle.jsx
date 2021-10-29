import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header, Container, Form, Button, Modal } from "semantic-ui-react";
import { Article } from "../modules/apiHelper";
import CategoryList from "./CategoryList";

const CreateArticle = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    register("title");
    register("authors");
    register("lede");
    register("category");
    register("body");
    // eslint-disable-next-line
  }, []);

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (article) => {
    Article.create({ article }).then((response) => {
      if (
        response.data.message ===
        `You have successfully added ${article.title} to the site`
      ) {
        setOpen(true);
      }
    });
  };

  let categoryOptions = CategoryList();

  return (
    <Container>
      <Header
        className="center-postion"
        data-cy="page-header"
        size="huge"
        inverted
      >
        Create Article
      </Header>
      <Form
        size="huge"
        data-cy="create-article"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Input
          name="title"
          data-cy="title-input"
          placeholder="Title"
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Form.Input
          data-cy="journalist-input"
          placeholder="Journalists"
          name="authors"
          onChange={(e, { name, value }) => {
            setValue(name, [value]);
          }}
        />
        <Form.Input
          data-cy="lede-input"
          placeholder="Lede"
          name="lede"
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Form.Select
          data-cy="category-input"
          placeholder="Category"
          options={categoryOptions}
          name="category"
          value={categoryOptions.value}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Form.TextArea
          data-cy="body-input"
          placeholder="Body"
          name="body"
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
        />
        <Button data-cy="submit-button" type="submit">
          Submit
        </Button>
      </Form>
      <Modal
        basic
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Content>
          <h1 data-cy="article-creation">
            You have successfully added the article to the site
          </h1>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default CreateArticle;
