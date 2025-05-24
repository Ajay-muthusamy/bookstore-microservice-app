import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authSchema from "../model/auth.model.js";

export const authControl = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new authSchema({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Register Successfully", userId: newUser._id,status:"success"});
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
};

export const loginControl = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await authSchema.findOne({ email });
  if (!existingUser) return res.status(404).json({ error: "User not found" });

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token, userId: existingUser._id,message : "login Successfully" });
};
