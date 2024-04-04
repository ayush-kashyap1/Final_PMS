'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import GoogleIcon from "./Icons/GoogleIcon";
import Link from "next/link";
import SignIn from "@/Pages/SignIn";
import { useRouter } from 'next/router';
import axios from 'axios';


function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...other}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

const GenderRadioButton = ({ value, selectedValue, onChange }) => {
  const handleClick = () => {
    onChange(value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: 16,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "2px solid #000",
          backgroundColor: selectedValue === value ? "#1e1eff" : "#FFF",
          marginRight: 8,
        }}
      />
      <Typography>{value}</Typography>
    </div>
  );
};

const SignUpForm = (key, value) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const router = useRouter();


  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px",
            "--Cover-width": "50vw",
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <Typography level="title-lg">Company logo</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an Account?{" "}
                  <Typography style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => router.push('../SignIn')} level="title-sm">
                    Sign In!
                  </Typography>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Sign up with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={ async (event) => {
                    event.preventDefault();
                    //const formElements = event.currentTarget.elements;
                    const formElements = new FormData(event.currentTarget);

                    const data = {
                        firstName: formElements.firstName,
                        lastName: formElements.lastName,
                        email: formElements.email,
                        password: formElements.password,
                        phoneNumber: formElements.phoneNumber,
                        dob: formElements.dob,
                        gender: selectedGender,
                        address: formElements.address,
                        country: formElements.country,

                    };


                      const response = await axios.post('/api/signup', data);
                      console.log(response.data);

                      // Writing to UserData.json in the same directory as SignUpForm.js
                      //localStorage.setItem('userData', JSON.stringify(data));


                      //alert("Data stored successfully.");
                      //router.push('../SignIn');
                    //} catch (error) {
                      // Log the error
                      //console.error("Error posting data to backend:", error);

                      // Writing to UserData.json in case of error
                      //localStorage.setItem('userData', JSON.stringify(data));

                      //alert("Data stored locally. ");
                      //console.log(error);
                      //router.push('../SignIn');
                }
              }
              >
                <FormControl required>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name="firstName" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name="lastName" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone Number</FormLabel>
                  <div style={{ display: "flex" }}>
                    <Input
                      type="tel"
                      name="countryCode"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{ width: "20%", marginRight: 8 }}
                    />
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{ width: "80%" }}
                    />
                  </div>
                </FormControl>
                <FormControl required>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" name="dob" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Gender</FormLabel>
                  <div style={{ display: "flex", gap: 16 }}>
                    <GenderRadioButton
                      value="Male"
                      selectedValue={selectedGender}
                      onChange={setSelectedGender}
                    />
                    <GenderRadioButton
                      value="Female"
                      selectedValue={selectedGender}
                      onChange={setSelectedGender}
                    />
                    <GenderRadioButton
                      value="Others"
                      selectedValue={selectedGender}
                      onChange={setSelectedGender}
                    />
                  </div>
                </FormControl>
                <FormControl required>
                  <FormLabel>Address</FormLabel>
                  <Input type="text" name="address" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Country</FormLabel>
                  <Input type="text" name="country" />
                </FormControl>
                <Button type="submit"  fullWidth>
                  Sign up
                </Button>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left:
            "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
};

export default SignUpForm;
