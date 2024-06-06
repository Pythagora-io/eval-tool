const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const testSchema = new mongoose.Schema({
  test_id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tested_at: {
    type: Date,
    default: Date.now
  },
  messages: [{
    role: {
      type: String,
      enum: ['system', 'user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }],
  review_instructions: {
    type: String,
    required: false,
    default: ''
  },
  scenarios: [{
    provider: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    temp: {
      type: Number,
      required: true
    },
    comments: {
      type: String,
      default: ''
    },
    results: [{
      response: {
        type: String,
        required: true
      },
      review: {
        type: String,
        default: ''
      },
      score: {
        type: Number,
        required: true,
        enum: [0, 1]
      }
    }]
  }]
});

// Add calculateScorePercentage method
testSchema.methods.calculateScorePercentage = function() {
  return this.scenarios.map(scenario => {
    const totalResults = scenario.results.length;
    const passedResults = scenario.results.filter(result => result.score === 1).length;
    return totalResults > 0 ? (passedResults / totalResults * 100).toFixed(2) : '0.00';
  });
};

testSchema.pre('save', function(next) {
  console.log('Saving test with ID:', this.test_id);
  next();
});

testSchema.post('save', function(doc, next) {
  console.log(`Test ${doc.test_id} saved successfully.`);
  next();
});

testSchema.post('save', function(error, doc, next) {
  if (error) {
    console.error('Error saving test:', error.message);
    next(error);
  } else {
    next();
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;