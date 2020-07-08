import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Divider } from 'antd';
import { DeleteOutlined, MehOutlined, LinkOutlined } from '@ant-design/icons';

const { Meta } = Card;

function PublicProfile() {
  const { userID } = useParams(); // userID is username in this component
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    fetch(`/api/preference/userprefs/3`)
      .then((res) => res.json())
      .then((resData) => {
        // Store the recipes in state
        console.log('RESDATA======', resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // On mount, fetch the users favorites from the DB
  useEffect(() => {
    fetch(`/api/favorites/${userID}`)
      .then((res) => res.json())
      .then((resData) => {
        // Store the recipes in state
        setFavs(resData.favorites);
        // console.log('RESDATA======', resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID]);

  return (
    <div className="site-layout-content">
      <Card style={{ width: '66%', opacity: 0.9 }}>
        <Divider orientation="left">{`${userID}'s saved recipes`}</Divider>
        <div className="Favorites_Container">
          {favs.map((fav, i) => {
            return (
              <Card
                key={i}
                style={{ width: 300, margin: '10px 10px 10px 10px' }}
                cover={<img alt="example" src={`${fav.image}`} />}
                actions={[
                  <DeleteOutlined
                    onClick={() => {
                      removeFav(fav.id);
                    }}
                  />,
                  <LinkOutlined
                    onClick={() => {
                      window.open(fav.source_url, '_blank');
                    }}
                  />,
                ]}
              >
                <Meta title={`${fav.title}`} />
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default PublicProfile;
