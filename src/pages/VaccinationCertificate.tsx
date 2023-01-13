import React from 'react';
import styled from '@emotion/styled';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Footer from 'components/Footer';
import Header from 'components/Header';
import MenuUser from 'components/MenuUser';

const ResultContainer = styled.div``;

const Certificate = styled.div``;

const Typo1 = styled(Typography)``;

const Typo2 = styled(Typography)``;

const Typo3 = styled(Typography)``;

const CertificateFrame = styled.div``;

const CertificateItem = styled.div``;

const VaccinationCertificate = () => {
  return (
    <div>
      <Header />
      <MenuUser />

      <Footer />
    </div>
  );
};

export default VaccinationCertificate;
