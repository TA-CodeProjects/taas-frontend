 /* {<Card>
          <Card.Header className="text-center">
            {props.task.caption}
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.task.classification}</Card.Text>
            <Card.Text>
              {moment(props.task.dueDate).format("DD/MM/yyyy")}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around">
            <Button onClick={handleShow} variant="default" >
              <MdDelete size={42} />
            </Button>
            <DeleteTodo
              id={props.task.id}
              show={show}
              handleClose={handleClose}
              setTasks={props.setTasks}
            />
            {/* <Link to={`delete/${props.task.id}`} >
              <MdDelete size={42} />
            </Link> */}
        {/* <Link to={`update/${props.task.id}`} >
              <MdModeEdit size={42} />
            </Link>
          </Card.Footer>
        </Card> */}