import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CloseIcon from "@mui/icons-material/Close";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmer l'action",
  message = "Voulez-vous continuer ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  severity = "warning",
}) {
  const isError = severity === "error";

  const confirmBtnSx = {
    backgroundColor: isError ? "#ef4444" : "#f97316",
    color: "#fff",
    fontWeight: 700,
    px: 3,
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "0.9rem",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: isError ? "#dc2626" : "#ea6d0a",
      boxShadow: "none",
    },
  };

  const bannerBg = isError ? "#fef2f2" : "#fff7ed";
  const iconColor = isError ? "#ef4444" : "#f97316";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          p: 1,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#1e293b",
        }}
      >
        {title}
        <IconButton size="small" onClick={onClose} sx={{ color: "#94a3b8" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent sx={{ pt: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            backgroundColor: bannerBg,
            borderRadius: "10px",
            p: "12px 14px",
          }}
        >
          <WarningAmberRoundedIcon
            sx={{ color: iconColor, fontSize: 22, mt: "1px", flexShrink: 0 }}
          />
          <Typography sx={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.55 }}>
            {message}
          </Typography>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#cbd5e1",
            color: "#374151",
            fontWeight: 600,
            px: 3,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "0.9rem",
            "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" },
          }}
        >
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" disableElevation sx={confirmBtnSx}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
