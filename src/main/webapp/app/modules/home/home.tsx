import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { BreadcrumbSkeleton, Accordion, AccordionItem, DataTable, DataTableSkeleton, Footer } from 'carbon-components-react';
const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;
export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  onClick() {}

  render() {
    const rows = [
      {
        id: 'a',
        foo: 'Foo a',
        bar: 'Bar a',
        baz: 'Baz a'
      },
      {
        id: 'b',
        foo: 'Foo b',
        bar: 'Bar b',
        baz: 'Baz b'
      },
      {
        id: 'c',
        foo: 'Foo c',
        bar: 'Bar c',
        baz: 'Baz c'
      }
    ];

    // We would have a headers array like the following
    const headers = [
      {
        // `key` is the name of the field on the row object itself for the header
        key: 'foo',
        // `header` will be the name you want rendered in the Table Header
        header: 'Foo'
      },
      {
        key: 'bar',
        header: 'Bar'
      },
      {
        key: 'baz',
        header: 'Baz'
      }
    ];

    const breadcrumbSkeleton = <BreadcrumbSkeleton />;
    const { account } = this.props;
    return (
      <Row>
        <Col md="12">
          {breadcrumbSkeleton}
          <div>
            <br />
            <DataTableSkeleton />
          </div>
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
