import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  {
    id: 1,
    name: 'Alex Johnson',
    description:
      'Alex is a seasoned graphic designer with over 10 years of experience in creating stunning visuals for brands across various industries. His expertise lies in logo design, branding, and digital illustrations.',
    image: 'https://example.com/images/alex_johnson.jpg',
    phone_number: '+1 555-123-4567',
    email: 'alex.johnson@example.com',
    facebook_link: 'https://www.facebook.com/alexjohnsondesigns',
    twitter_link: 'https://twitter.com/alexjdesigns',
    instagram_link: 'https://www.instagram.com/alexjohnsondesigns',
    linkedin_link: 'https://www.linkedin.com/in/alexjohnsondesigns',
    dribble_link: 'https://dribbble.com/alexjohnson'
  },
  {
    id: 2,
    name: 'Emma Smith',
    description:
      'Emma is a creative director with a passion for storytelling through visual media. She has over 8 years of experience working with top brands to create compelling campaigns.',
    image: 'https://example.com/images/emma_smith.jpg',
    phone_number: '+1 555-234-5678',
    email: 'emma.smith@example.com',
    facebook_link: 'https://www.facebook.com/emmasmithcreatives',
    twitter_link: 'https://twitter.com/emmascreatives',
    instagram_link: 'https://www.instagram.com/emmasmithcreatives',
    linkedin_link: 'https://www.linkedin.com/in/emmasmithcreatives',
    dribble_link: 'https://dribbble.com/emmasmith'
  },
  {
    id: 3,
    name: 'Michael Brown',
    description:
      'Michael is a web developer with a knack for creating user-friendly and responsive websites. With over 7 years of experience, he specializes in front-end development and UX/UI design.',
    image: 'https://example.com/images/michael_brown.jpg',
    phone_number: '+1 555-345-6789',
    email: 'michael.brown@example.com',
    facebook_link: 'https://www.facebook.com/michaelbrowndev',
    twitter_link: 'https://twitter.com/michaelbdev',
    instagram_link: 'https://www.instagram.com/michaelbrowndev',
    linkedin_link: 'https://www.linkedin.com/in/michaelbrowndev',
    dribble_link: 'https://dribbble.com/michaelbrown'
  },
  {
    id: 4,
    name: 'Sophia Lee',
    description:
      'Sophia is a digital marketer with expertise in social media strategy and content creation. She has helped numerous brands grow their online presence over the past 6 years.',
    image: 'https://example.com/images/sophia_lee.jpg',
    phone_number: '+1 555-456-7890',
    email: 'sophia.lee@example.com',
    facebook_link: 'https://www.facebook.com/sophialeemarketing',
    twitter_link: 'https://twitter.com/sophialmarketing',
    instagram_link: 'https://www.instagram.com/sophialeemarketing',
    linkedin_link: 'https://www.linkedin.com/in/sophialeemarketing',
    dribble_link: 'https://dribbble.com/sophialee'
  },
  {
    id: 5,
    name: 'James Williams',
    description:
      'James is a video producer with over 9 years of experience in creating high-quality video content for a variety of platforms. He specializes in corporate videos, commercials, and documentaries.',
    image: 'https://example.com/images/james_williams.jpg',
    phone_number: '+1 555-567-8901',
    email: 'james.williams@example.com',
    facebook_link: 'https://www.facebook.com/jameswilliamsvideos',
    twitter_link: 'https://twitter.com/jameswvideos',
    instagram_link: 'https://www.instagram.com/jameswilliamsvideos',
    linkedin_link: 'https://www.linkedin.com/in/jameswilliamsvideos',
    dribble_link: 'https://dribbble.com/jameswilliams'
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    description:
      'Olivia is an experienced content writer who excels in creating engaging and SEO-friendly content. She has been helping businesses improve their online visibility for over 5 years.',
    image: 'https://example.com/images/olivia_martinez.jpg',
    phone_number: '+1 555-678-9012',
    email: 'olivia.martinez@example.com',
    facebook_link: 'https://www.facebook.com/oliviamartinezwriter',
    twitter_link: 'https://twitter.com/oliviawrites',
    instagram_link: 'https://www.instagram.com/oliviamartinezwriter',
    linkedin_link: 'https://www.linkedin.com/in/oliviamartinezwriter',
    dribble_link: 'https://dribbble.com/oliviamartinez'
  }
];

const fetchTeamMember = createAsyncThunk('fetchTeamMember', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const TeamMemberSlice = createSlice({
  name: 'teamMember',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTeamMember.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchTeamMember.rejected, (state, action) => {
      console.log('Team Member details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchTeamMember };
export default TeamMemberSlice.reducer;
