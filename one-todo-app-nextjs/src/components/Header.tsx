"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import { AccountCircle, ExitToApp, DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import { useThemeMode } from "./ThemeProvider";

export default function Header() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleTheme } = useThemeMode();

  const { data, isPending } = authClient.useSession();

  const name = useMemo(() => {
    if (!data) return null;
    return data.user.name ?? data.user.email;
  }, [data]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            OneTodo
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton 
          onClick={toggleTheme} 
          color="inherit" 
          sx={{ mr: 1 }} 
          title={`Current: ${mode} theme`}
          suppressHydrationWarning
        >
          {mode === 'light' ? <LightMode /> : mode === 'dark' ? <DarkMode /> : <SettingsBrightness />}
        </IconButton>

        {!isPending && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {data && name ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: 'primary.main',
                      fontSize: '0.875rem'
                    }}
                  >
                    {name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {name}
                  </Typography>
                </Box>

                <IconButton
                  size="small"
                  onClick={handleMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/login" passHref>
                <Button variant="contained" size="small">
                  Login
                </Button>
              </Link>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
