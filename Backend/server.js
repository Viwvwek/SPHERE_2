// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(limiter);
app.use(express.static('public'));

// Mock database
let users = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123', // In production, store hashed passwords
    name: 'John Doe',
    cart: []
  }
];

let items = [
  {
    id: 1,
    name: "Folding Chair",
    price: 0.09,
    image: "/folding-chair.jpg",
    category: "Furniture",
    stock: 50
  },
  {
    id: 2,
    name: "Decorative Lanterns",
    price: 0.9,
    image: "/decoartive-lantern.jpg",
    category: "Decor",
    stock: 100
  },
  {
    id: 3,
    name: "Event Tent",
    price: 25,
    image: "/tent.jpg",
    category: "Outdoor",
    stock: 10
  },
  {
    id: 4,
    name: "Table Cloth",
    price: 0.010,
    image: "/table-cloth.jpg",
    category: "Decor",
    stock: 200
  },
  {
    id: 5,
    name: "String Lights",
    price: 0.99,
    image: "/string-lights.jpg",
    category: "Decor",
    stock: 75
  },
  {
    id: 6,
    name: "Portable Speaker",
    price: 0.7,
    image: "/portable-speaker.jpg",
    category: "Electronics",
    stock: 30
  }
];

let events = [
  {
    id: "wedding-1",
    title: "Luxury Garden Wedding",
    category: "weddings",
    description: "An elegant garden wedding with full-service catering and live music",
    date: "2024-08-15",
    location: "Botanical Gardens, New York",
    price: 15000,
    image: "/placeholder.jpg",
    featured: true,
  },
  {
    id: "birthday-1",
    title: "Kids Birthday Bash",
    category: "birthdays",
    description: "A fun-filled birthday party with games, entertainment, and cake",
    date: "2024-07-20",
    location: "Fun Zone, Miami",
    price: 500,
    image: "/placeholder.jpg",
  }
];

// Helper functions
const findUserById = (userId) => users.find(user => user.id === userId);
const findItemById = (itemId) => items.find(item => item.id === itemId);
const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, cartItem) => {
    const item = findItemById(cartItem.itemId);
    return total + (item.price * cartItem.quantity);
  }, 0);
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  // In a real app, verify JWT token here
  const userId = token; // Mock - using user ID as token
  const user = findUserById(userId);
  
  if (!user) return res.sendStatus(403);
  
  req.user = user;
  next();
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: "Fuse Event Management API" });
});

// Items API
app.get('/api/items', (req, res) => {
  try {
    const { search, minPrice, maxPrice, category } = req.query;
    let filteredItems = [...items];

    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      filteredItems = filteredItems.filter(item => item.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredItems = filteredItems.filter(item => item.price <= parseFloat(maxPrice));
    }

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    res.json(filteredItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Cart API
app.get('/api/cart', authenticate, (req, res) => {
  try {
    const user = req.user;
    const cartWithDetails = user.cart.map(cartItem => {
      const item = findItemById(cartItem.itemId);
      return {
        ...cartItem,
        itemDetails: item
      };
    });
    
    res.json({
      items: cartWithDetails,
      total: calculateCartTotal(user.cart)
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/api/cart', authenticate, (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    const user = req.user;
    
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const item = findItemById(parseInt(itemId));
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(i => i.itemId === parseInt(itemId));
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      user.cart[existingItemIndex].quantity += parseInt(quantity);
    } else {
      // Add new item to cart
      user.cart.push({
        itemId: parseInt(itemId),
        quantity: parseInt(quantity)
      });
    }

    res.json({
      message: "Item added to cart",
      cart: {
        items: user.cart,
        total: calculateCartTotal(user.cart)
      }
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete('/api/cart/:itemId', authenticate, (req, res) => {
  try {
    const { itemId } = req.params;
    const user = req.user;
    
    user.cart = user.cart.filter(item => item.itemId !== parseInt(itemId));

    res.json({
      message: "Item removed from cart",
      cart: {
        items: user.cart,
        total: calculateCartTotal(user.cart)
      }
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Events API
app.get('/api/events', (req, res) => {
  try {
    const { category, location, minPrice, maxPrice } = req.query;
    let filteredEvents = [...events];

    if (category) {
      filteredEvents = filteredEvents.filter(event => event.category === category);
    }

    if (location) {
      filteredEvents = filteredEvents.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minPrice) {
      filteredEvents = filteredEvents.filter(event => event.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filteredEvents = filteredEvents.filter(event => event.price <= parseFloat(maxPrice));
    }

    res.json(filteredEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/events/featured', (req, res) => {
  try {
    const featuredEvents = events.filter(event => event.featured);
    res.json(featuredEvents);
  } catch (error) {
    console.error("Error fetching featured events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/api/events/:id', (req, res) => {
  try {
    const event = events.find(e => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Authentication API
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // In a real app, generate a JWT token
    const token = user.id;
    
    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/api/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (users.some(u => u.email === email)) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password, // In production, hash the password
      cart: []
    };

    users.push(newUser);
    
    // In a real app, generate a JWT token
    const token = newUser.id;
    
    res.status(201).json({ 
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      } 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;