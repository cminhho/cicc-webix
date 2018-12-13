import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { BreadcrumbSkeleton, Accordion, AccordionItem } from 'carbon-components-react';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="9">
          <h2>Welcome, CiCC Platform!</h2>
          <BreadcrumbSkeleton />
          <article className="App__demo">
            <h3 className="App__demo-title">Carbon Components</h3>
            <Accordion>
              <AccordionItem title="Example">
                <p>This is a Component imported from Carbon and styled with the CSS from the main Carbon Components GitHub repo!</p>
              </AccordionItem>
              <AccordionItem title="Questions?">
                <p>
                  Hi there!{' '}
                  <span aria-label="Hand wave" role="img">
                    👋{' '}
                  </span>{' '}
                  if you have any questions about this demo, or are running into any issues setting this up in your own development
                  environment, please feel free to reach out to us on Slack or make an issue on the GitHub Repository.
                </p>
              </AccordionItem>
            </Accordion>
          </article>
          <p className="lead">This is your homepage</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
