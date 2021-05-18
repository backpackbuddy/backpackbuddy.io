import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Container, ListGroup, ListGroupItem, Row, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import Layout from "../../components/layouts/app";
import ProfileAccountForm from "../../components/modules/ProfileAccountForm";
import ProfileSecurityForm from '../../components/modules/ProfileSecurityForm';
import Header from "../../components/modules/Header";
import { logoutUtils } from "../../utils/auth";
import Loading from "../../components/elements/Loading";

function Profile () {
  const router = useRouter();
  const { page } = router.query;
  const { asPath } = router;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (page) {
      setLoading(false);
    }
  }, [router])

  return (
    <>
      <Header />
      <Layout>
        <Container className="my-5">
          {loading ? <Loading className="my-5" /> :
            (<Tab.Container id="menu-settings" defaultActiveKey={asPath}>
              <Row>
                <Col md={4}>
                  <section className="p-4">
                    <ListGroup>
                      <Link href="/profile/account">
                        <ListGroupItem action href="/profile/account">Account</ListGroupItem>
                      </Link>
                      <Link href="/profile/security">
                        <ListGroupItem action href="/profile/security">Security</ListGroupItem>
                      </Link>
                      <ListGroupItem className="text-danger" action onClick={logoutUtils}>Logout</ListGroupItem>
                    </ListGroup>
                  </section>
                </Col>
                <Col md={8}>
                  <section className="p-4">
                    <Tab.Content>
                      <Tab.Pane eventKey="/profile/account">
                        {page === 'account' && <ProfileAccountForm />}
                      </Tab.Pane>
                      <Tab.Pane eventKey="/profile/security">
                        {page === 'security' && <ProfileSecurityForm />}
                      </Tab.Pane>
                    </Tab.Content>
                  </section>
                </Col>
              </Row>
            </Tab.Container>)}
        </Container>
      </Layout>
    </>
  );
}

export default Profile;