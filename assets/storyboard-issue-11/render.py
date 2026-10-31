"""Original no-credit blocking diagrams for issue #11; no Polyfork geometry copied."""
import json, math
from pathlib import Path
root=Path(__file__).parent
scene={'room_m':[6,3,8], 'chair_center':[0,0,1], 'console_center':[0,0,-.35], 'display_centers':[[-1.5,1.8,-2.8],[0,1.8,-2.8],[1.5,1.8,-2.8]], 'costume':'plain charcoal', 'light':'cool white, restrained amber', 'status':'proposed staging, not accepted canon', 'shots':[
 {'id':'01-wide','camera':[5,3.4,7],'target':[0,1,-.4],'lean':0,'gesture':'hands resting'},
 {'id':'02-approach','camera':[4.2,2,1.8],'target':[0,1,-.1],'lean':.24,'gesture':'right hand approaches console without contact'},
 {'id':'03-withdraw','camera':[2.8,1.8,1.6],'target':[0,1,.1],'lean':0,'gesture':'right hand withdrawn to chair arm; head remains toward displays'}]}
(root/'scene.json').write_text(json.dumps(scene,indent=2)+'\n')
def sub(a,b):return [x-y for x,y in zip(a,b)]
def dot(a,b):return sum(x*y for x,y in zip(a,b))
def norm(a):l=math.sqrt(dot(a,a));return [x/l for x in a]
def cross(a,b):return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
for shot in scene['shots']:
 cam=shot['camera'];f=norm(sub(shot['target'],cam));r=norm(cross(f,[0,1,0]));u=cross(r,f)
 def project(p):v=sub(p,cam);d=dot(v,f);return (480+650*dot(v,r)/d,270-650*dot(v,u)/d)
 shapes=[]
 def poly(points,color,stroke='#747b83'):
  shapes.append((sum(dot(sub(p,cam),f) for p in points)/len(points),'<polygon points="'+' '.join('%.2f,%.2f'%project(p) for p in points)+'" fill="'+color+'" stroke="'+stroke+'" stroke-width="1.2"/>'))
 def box(c,size,color):
  x,y,z=c;w,h,d=[v/2 for v in size];p=[(x+a*w,y+b*h,z+c*d) for a,b,c in [(-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),(-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)]]
  for ids in [(0,1,2,3),(4,7,6,5),(0,4,5,1),(3,2,6,7),(1,5,6,2),(0,3,7,4)]:poly([p[i] for i in ids],color)
 def limb(a,b,color='#555c64',width=13):
  aa,bb=project(a),project(b);shapes.append((dot(sub([(x+y)/2 for x,y in zip(a,b)],cam),f),f'<path d="M {aa[0]:.2f} {aa[1]:.2f} L {bb[0]:.2f} {bb[1]:.2f}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>'))
 poly([[-3,0,-3],[3,0,-3],[3,0,5],[-3,0,5]],'#25282d','#454950')
 poly([[-3,0,-3],[3,0,-3],[3,3,-3],[-3,3,-3]],'#343941','#555d66')
 poly([[-3,0,5],[-3,0,-3],[-3,3,-3],[-3,3,5]],'#2c3036','#454950')
 background=shapes;shapes=[];marks=[]
 for i,(x,y,z) in enumerate(scene['display_centers']):
  box([x,y,z],[1.18,.72,.07],'#59636e');poly([[x-.52,y-.29,z+.05],[x+.52,y-.29,z+.05],[x+.52,y+.29,z+.05],[x-.52,y+.29,z+.05]],'#bccbd5','#c6d4dc')
  for j in range(3):
   limb([x-.32,y-.12+j*.12,z+.06],[x+.26-j*.1,y-.12+j*.12,z+.06],'#c5a26c' if i==1 else '#7f939e',3);marks.append(shapes.pop())
 # Fixed console, chair and armrests. Original proxy shapes, not vendor files.
 box([0,.4,-.35],[.65,.8,.6],'#363e47');box([0,.86,-.35],[1,.12,.72],'#65717c')
 box([0,.48,1],[.72,.12,.72],'#424951');box([0,.93,1.3],[.72,.9,.12],'#454d55')
 for x in [-.29,.29]:
  for z in [.73,1.25]:box([x,.23,z],[.06,.46,.06],'#454d55')
  box([x,.76,1],[.09,.07,.65],'#626b75')
 lean=shot['lean'];z=1-lean
 box([0,1.02,z],[.4,.65,.24],'#4b525b')
 for x in [-.16,.16]:limb([x,.68,1],[x,.47,.57],width=16);limb([x,.47,.57],[x,.1,.43],width=14)
 head=project([0,1.48,z-.03]);radius=650*.13/dot(sub([0,1.48,z],cam),f);shapes.append((dot(sub([0,1.48,z],cam),f),f'<ellipse cx="{head[0]:.2f}" cy="{head[1]:.2f}" rx="{radius:.2f}" ry="{radius*1.15:.2f}" fill="#adb6bf" stroke="#d8dfe5"/>'))
 for x in [-.25,.25]:
  elbow=[x,.92,z+.03];hand=[x,.8,.85]
  if shot['id']=='02-approach' and x>0:elbow=[x,1.03,.5];hand=[.2,1.01,.09] # 0.1m+ clearance from console; no contact.
  limb([x,1.2,z],elbow,width=11);marks.append(shapes.pop());limb(elbow,hand,width=10);marks.append(shapes.pop())
 svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img" aria-labelledby="title desc"><title id="title">'+shot['id']+'</title><desc id="desc">Proposed original blocking diagram: '+shot['gesture']+'. One anonymous adult, one chair, one console, three abstract displays. Not accepted canon.</desc><rect width="960" height="540" fill="#171a20"/>'+''.join(v for _,v in background)+''.join(v for _,v in sorted(shapes,reverse=True))+''.join(v for _,v in marks)+'</svg>'
 (root/(shot['id']+'.svg')).write_text(svg+'\n')
