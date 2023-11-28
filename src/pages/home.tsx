import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import ProfileModal from './components/ProfileModal';

function Home() {
  const initialData = localStorage.getItem('demo_profile_data') ?? '{}';
  const [editVisible, setEditVisible] = useState(false);
  const [profileData, setProfileData] = useState(JSON.parse(initialData));

  const showEdit = useCallback(() => {
    setEditVisible(true);
  }, []);
  const hideEdit = useCallback(() => {
    setEditVisible(false);
  }, []);

  const handleConfirm = useCallback((values) => {
    setProfileData(values);
    localStorage.setItem('demo_profile_data', JSON.stringify(values));
    hideEdit();
  }, []);

  return (
    <ProfileWrapper>
      <ProfileContent>
        <div className="title">
          My Profile{' '}
          <div onClick={showEdit} className="edit">
            Edit
          </div>
        </div>
        <div className="single-line">
          <div className="label">Username</div>
          <div className="value">{profileData.username}</div>
        </div>
        <div className="single-line">
          <div className="label">E-Mail</div>
          <div className="value">{profileData.email}</div>
        </div>
        <div className="single-line">
          <div className="label">Mobile</div>
          <div className="value">{profileData.mobile}</div>
        </div>
      </ProfileContent>
    
      <ProfileModal visible={editVisible} onCancel={hideEdit} handleConfirm={handleConfirm} />
    </ProfileWrapper>
  );
}

export default Home;

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #0d0b13;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

const StyledPanel = styled.div`
  width: 500px;
  height: auto;
  border-radius: 16px;
  padding: 40px;
  background: #0e0c15;
  border-radius: 16px;
  gap: 24px;
  position: relative;

  @media (max-width: 769px) {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px; /* control the border thickness */
    background: linear-gradient(
      146deg,
      rgba(109, 187, 186, 1) 0%,
      rgba(231, 193, 120, 1) 47%,
      rgba(197, 112, 217, 1) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const ProfileContent = styled(StyledPanel)`
  .title {
    font-size: 18px;
    color: #fff;
    text-align: left;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .edit {
      cursor: pointer;
      color: #50acfd;
    }
  }

  .single-line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .label {
      font-size: 14px;
      color: #969696;
    }

    .value {
      font-size: 14px;
      color: #fff;
    }
  }
`;
