### **Objective:**    
Build a responsive UI for searching and viewing data from the Metropolitan Museum of Art Collection API using React, Next.js, and React Bootstrap. Add "Favourites" and "Search History" functionality using Jotai. Also, address usability issues like invalid object IDs and responsive navigation.    

### **Steps to Complete**    

**Step 1: Creating the Next.js App**   
1. Set up a new Next.js app using create-next-app.   
2. Install required modules:   
   - swr   
   - bootstrap    
   - react-bootstrap    
   - react-hook-form     
3. Import Bootstrap CSS:    
   - Default: import 'bootstrap/dist/css/bootstrap.min.css'.    
   - Optional: Use Bootswatch themes like "Flatly" for custom styles.    
  
**Step 2: Layout Components**    
1. MainNav:    
   - Add a fixed-top Navbar with navbar-dark and bg-primary.   
   - Navbar.Brand displays the student name without href.   
   - Links for "Home" and "Advanced Search" (/ and /search).   
   - Add a <Form> for searching artworks.    
2. Layout:   
   - Wrap children with <MainNav />, <Container>, and <br />.   
3. App:   
   - Wrap components with <Layout> and <SWRConfig> for global fetcher setup.
  
**Step 3: Artwork Components**
1. ArtworkCard:   
   - Fetch artwork data using SWR.   
   - Display artwork details in a Bootstrap card.   
   - Show placeholder if data is missing (e.g., image, title).   
   - Provide a button to navigate to detailed artwork view.   
2. ArtworkCardDetail:   
   - Similar to ArtworkCard but includes additional fields like artistDisplayName and links to their Wikidata.   
  
**Step 4: Artwork Pages**   
1. Artwork Index (/artwork):   
   - Fetch and paginate artwork data (12 items per page).   
   - Display "Nothing Here" if no results.   
   - Include pagination controls.   
2. Artwork By ID (/artwork/[objectID]):   
   - Render ArtworkCardDetail with the objectID parameter.
  
**Step 5: Search and Home Pages**  
1. Advanced Search (/search):   
   - Create a form for advanced searches with validation (React Hook Form).   
   - Redirect users to /artwork with a query string.   
2. Home Page (/):  
   - Display a royalty-free image of The Met (as uploaded).    
   - Include a Wikipedia description with a link.   

**Step 6: Fix Invalid Object IDs**   
1. Artwork Index (/artwork):   
   - Fetch and paginate artwork data (12 items per page) using valid object IDs filtered from validObjectIDList.json.    
   - If no results are found, display the message: "Nothing Here Try searching for some artwork."   
   - Include pagination controls for navigating through the artwork list.   
2. Artwork By ID (/artwork/[objectID]):   
   - Render ArtworkCardDetail using the objectID parameter.   
   - Add a "+ Favourite" button to allow users to add/remove artwork from the favourites list.   
     - Button updates dynamically based on whether the artwork is in the favourites list.   
     - Use Jotai's favouritesAtom to manage the list.   
 
**Step 7: Navigation Improvements**  
1. Auto-Hiding Navbar (Mobile / Small Screens):   
   - Add an isExpanded state to the MainNav component.   
   - Automatically collapse the navbar after user actions (e.g., clicking links, submitting search forms).   
2. Fix Navbar Highlighting:    
   - Use the active attribute with router.pathname to highlight the current page in the navigation menu.    

**Step 8: Favourites Page**
1. Favourites (/favourites):   
   - Fetch and display artwork from the favouritesAtom.    
   - Use the same layout as /artwork but without pagination.    
   - If no favourites exist, display the message: "Nothing Here Try adding some new artwork to the list."    
   - Add a link to /favourites in the "User Name" dropdown in MainNav.    

**Step 9: Search and History Pages**   
1. Advanced Search (/search):    
   - Create a form for advanced searches with validation using React Hook Form.    
   - Redirect users to /artwork with a query string after form submission.  
   - Add the search query to the searchHistoryAtom for tracking purposes.   
2. Search History (/history):   
   - Display all previous searches stored in searchHistoryAtom.    
   - Provide functionality to re-run or delete searches:   
     - Re-run: Clicking a search navigates to /artwork with the corresponding query string.   
     - Delete: Clicking a delete button removes the search from the history.   
   - If no searches exist, display the message: "Nothing Here Try searching for some artwork."   
   - Use a CSS hover effect for search history entries to improve usability.   
   - Add a link to /history in the "User Name" dropdown in MainNav.
  
**Step 10: Home Page**
1. Home Page (/):   
   - Display a royalty-free image of The Met (uploaded locally).    
   - Include a Wikipedia description of The Met with a link to the full entry.
  
**Deliverables**  
- Fully functional "Met Artwork" app with:   
  - Valid ID filtering.   
  - Responsive navbar.   
  - Favourites and search history functionality.   
  - Proper navigation highlighting.   
